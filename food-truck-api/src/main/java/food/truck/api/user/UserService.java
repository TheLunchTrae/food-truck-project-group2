package food.truck.api.user;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import food.truck.api.other.Event;
import food.truck.api.other.Preferences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }

    public User findUser(String token) { return userRepository.findByToken(token); }

    public User secureUser(User user){
        User sec = new User();
        sec.setUserName(user.getUserName());
        sec.setUserType(user.getUserType());
        sec.setEmailAddress(user.getEmailAddress());
        sec.setFoodTypePreferences(user.getFoodTypePreferences());
        sec.setLocationPreference(user.getLocationPreference());
        sec.setDistancePreference(user.getDistancePreference());    /*Added by sam*/
        sec.setRatingPreference(user.getRatingPreference());
        sec.setPricePreference(user.getPricePreference());
        return sec;
    }
    // Hashes the input string and returns the hash
    public String hashPassword(String password) throws NoSuchAlgorithmException {
        // hash the password
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[]hashInBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));

        //bytes to hex
        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public String loginUser(User user){
        User postUser;
        if((postUser = userRepository.findByEmailAddressAndPassword(user.getEmailAddress(), user.getPassword())) != null){
            return postUser.getToken();
        }
        return null;
    }

    public String generateUserToken(User user) throws NoSuchAlgorithmException {
        return hashPassword(user.getId() + user.getEmailAddress() + user.getSignupDate().getTime() + user.getPassword());
    }

    public User saveUser(User user){
        //Check if user exists in database; if so, don't create
        if (userRepository.findByEmailAddress(user.getEmailAddress()) == null &&
                userRepository.findByUserName(user.getUserName()) == null) {

            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public Preferences getUserPreferences(long id){
        Preferences preferences = new Preferences();
        User user;
        if ((user = userRepository.findById(id)) != null){
            preferences.setDistance(user.getDistancePreference());
            preferences.setPrice(user.getPricePreference());
            preferences.setFoodTypes(user.getFoodTypePreferences());
            //Location not here
            preferences.setRating(user.getRatingPreference());

            return preferences;
        } else {
            //TODO - implement fall back
            return null;
        }
    }

    public User modifyUser(Event event){
        User user;
        if ((user = userRepository.findById(event.getUserId())) != null) {
            if ("NEW_UNAME".equals(event.getEventName())){
                user.setEmailAddress(event.getVal());
            } else if ("NEW_PASSWORD".equals(event.getEventName())){
                try {
                    user.setPassword(hashPassword(event.getVal()));
                } catch (NoSuchAlgorithmException e) {}
            } else {
                System.out.println("bad event name: "+event.getEventName());
                return null;
            }
            //Save the modified user
            userRepository.save(user);
        } else {
            System.out.println("finding user with id "+event.getUserId()+ " failed");
            return null;
        }
        return user;
    }

    //TODO - error check
    public User modifyUserPreferences(Preferences preferences, long id){
        System.out.println(preferences);
        User user;
        if ((user = userRepository.findById(id)) != null) {
            //Set rating
            user.setRatingPreference(preferences.getRating());
            //Set price
            user.setPricePreference(preferences.getPrice());
            //Set food preference
            user.setFoodTypePreferences(preferences.getFoodTypes());
            //Set location preference (if set)
            user.setLocationPreference(preferences.getLocation());
            //Set distance preference
            user.setDistancePreference(preferences.getDistance());

        } else {
            System.out.println("finding user with id "+id+ " failed");
            return null;
        }
        //Save the modified user
        userRepository.save(user);
        return user;
    }

    /**************************************************************************/

    public User addSubscription(long truckId, long userId){
        User user;
        if ((user = userRepository.findById(userId)) != null) {
            //NOTE - no check as to whether truck w/Id actually exists
            user.addSubscription(truckId);
        } else {
            System.out.println("finding user with id "+userId+ " failed");
            return null;
        }
        //Save the modified user
        userRepository.save(user);
        return user;
    }

    public User getUserWithId(long id){
        return userRepository.findById(id);
    }

    public String getUserNameWithId(long id){
        User user;
        if ((user = userRepository.findById(id)) != null) {
            return user.getUserName();
        } else {
            return "INVALID_USER_ID";
        }
    }
}

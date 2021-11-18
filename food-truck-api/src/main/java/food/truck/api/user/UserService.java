package food.truck.api.user;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.sql.Date;

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
        sec.setEmailAddress(user.getEmailAddress());
        sec.setFoodTypePreferences(user.getFoodTypePreferences());
        sec.setLocationPreference(user.getLocationPreference());
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
        return hashPassword(user.getId() + user.getSignupDate().toString() + user.getPassword());
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

    public User modifyUserPreferences(Preferences preferences, long id){
        User user;
        if ((user = userRepository.findById(id)) != null) {
            //Set rating (if set)
            if (preferences.getRating() != null){
                user.setRatingPreference(preferences.getRating());
            }
            //Set price (if set)
            if (preferences.getPrice() != null){
                user.setPricePreference(preferences.getPrice());
            }
            //Set food preference (if set)
            if (preferences.getFoodType() != null && preferences.getFoodType().length() > 0){
                //user.setFoodTypePreference(preferences.getFoodType());

                //Add user preference
                List<String> foodTypePreferences = user.getFoodTypePreferences();
                foodTypePreferences.add(preferences.getFoodType());
                user.setFoodTypePreferences(foodTypePreferences);
            }
            //Set location preference (if set)
            if (preferences.getLocation() != null){
                user.setLocationPreference(preferences.getLocation());
            }
        } else {
            System.out.println("finding user with id "+id+ " failed");
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

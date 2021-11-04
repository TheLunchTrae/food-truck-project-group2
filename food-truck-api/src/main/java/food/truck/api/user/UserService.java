package food.truck.api.user;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import food.truck.api.other.Event;
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

    public User loginUser(User user){
        return userRepository.findByEmailAddressAndPassword(user.getEmailAddress(),user.getPassword());
    }

    public User saveUser(User user){
        //Check if user exists in database; if so, don't create
        if (userRepository.findByEmailAddress(user.getEmailAddress()) == null) {
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

package food.truck.api.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@RestController
public class UserService {

    private UserRepository userRepository;

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }

    @PostMapping("/signup")
    public User saveUser(@RequestBody User user) {
        return userRepository.save(user);
    }

}

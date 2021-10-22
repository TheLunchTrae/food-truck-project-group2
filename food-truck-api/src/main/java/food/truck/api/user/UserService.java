package food.truck.api.user;

import java.io.FileWriter;
import java.io.IOException;
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

    @PostMapping("/login")
    public boolean loginUser(@RequestBody User user){
        return true;
    }

    @PostMapping("/signup")
    public User saveUser(@RequestBody User user) throws IOException {
        FileWriter csvWriter = new FileWriter("./user.txt");

        csvWriter.append(user.toString());

        csvWriter.flush();
        csvWriter.close();

        return user;
        //return userRepository.save(user);
    }

}

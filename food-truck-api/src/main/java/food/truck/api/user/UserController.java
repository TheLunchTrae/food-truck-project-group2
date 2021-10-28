package food.truck.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import food.truck.api.user.User;
import food.truck.api.user.UserService;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

@Log4j2
@RestController
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    /*
    @GetMapping("/user/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id);
        return user.orElse(null);
    }
    */

    //TODO - MUST HAVE CHECK FOR EXISTING USER
    @PostMapping("/signup")
    public User postUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));

        return userService.saveUser(user);
    }

    @GetMapping("/login")
    public String getUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));

        if (userService.loginUser(user) != null){
            return "Login successful";
        } else {
            return "Login failed";
        }
    }


}

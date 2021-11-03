package food.truck.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import food.truck.api.user.User;
import food.truck.api.user.UserService;
import lombok.extern.log4j.Log4j2;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import org.springframework.http.ResponseEntity;

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
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> postUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Methods", "POST")
                .body(userService.saveUser(user));
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

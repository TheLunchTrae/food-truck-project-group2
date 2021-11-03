package food.truck.api.user;

import food.truck.api.other.Event;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;
import food.truck.api.user.User;
import food.truck.api.user.UserService;
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> cafeb182555dbfb6f7766852b426468a622655cf
import lombok.extern.log4j.Log4j2;

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

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> postUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));
        //Check if successfully saved - will fail if username already exists in database
        User postUser = userService.saveUser(user);

        //TODO - fix check
        if (postUser == null){

        }

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

    //URGENT TODO - figure out what exactly the backend should return
    @GetMapping("/dashboard/view")
    public String getDashboardContents(@RequestBody User user){
        //TODO - test
        if (userService.loginUser(user) == null){
            return "User is not logged in";
        }
        return null;
    }

    //URGENT TODO - figure out what exactly the backend should return
    @PostMapping("/dashboard/modify")
    public String modifyUser(@RequestBody Event event){
        if (userService.modifyUser(event) != null) {
            return "User modified";
        } else {
            return "User modification failed.";
        }
        /*
        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .header("Content-Type", "application/json")
                .body(loginUser);
        */
    }

    //dash/board/addTruck is in FoodTruckController

}

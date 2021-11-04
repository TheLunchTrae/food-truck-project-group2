package food.truck.api.user;

import food.truck.api.other.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.log4j.Log4j2;
import java.security.NoSuchAlgorithmException;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity postUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));
        user.setEmailAddress(user.getEmailAddress().toLowerCase());
        //Check if successfully saved - will fail if username already exists in database
        User postUser = userService.saveUser(user);

        //TODO - fix check
        if (postUser == null){
            return ResponseEntity.ok()
                    .header("Email-Exists", "true")
                    .header("UserName-Exists", "true")
                    .body("Account Already Exists With This Email");
        }
        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(postUser);

    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getUser(@RequestBody User user, HttpServletRequest request) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));
        User postUser = userService.loginUser(user);

        if (userService.loginUser(user) != null){
            request.getSession().setAttribute("ID", postUser.getId());
            return ResponseEntity.ok()
                    .header("User-Type", postUser.getUserType())
                    .body(postUser);
        } else {
            return ResponseEntity.ok()
                    .body(null);
        }
    }

    @GetMapping("/details/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getUserWithId(@PathVariable long id){
        return ResponseEntity.ok()
                .body(userService.getUserWithId(id));
    }

    //URGENT TODO - figure out what exactly the backend should return
    @GetMapping("/dashboard/view")
    @CrossOrigin(origins = "http://localhost:3000")
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

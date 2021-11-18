package food.truck.api.user;

import food.truck.api.foodtruck.FoodTruckService;
import food.truck.api.other.DashboardData;
import food.truck.api.other.Event;
import food.truck.api.other.Preferences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.log4j.Log4j2;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedList;

import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;
    private FoodTruckService foodTruckService;

    @Autowired
    public UserController(UserService userService, FoodTruckService foodTruckService){
        this.userService = userService;
        this.foodTruckService = foodTruckService;
    }

    @PostMapping("/api/signup")
    public ResponseEntity signupUser(@RequestBody User user) throws NoSuchAlgorithmException {
        // hash the password
        user.setPassword(userService.hashPassword(user.getPassword()));
        user.setEmailAddress(user.getEmailAddress().toLowerCase());
        user.setSignupDate(new java.sql.Date(new java.util.Date().getTime()));
        user.setToken(userService.generateUserToken(user));
        //Check if successfully saved - will fail if username or email already exists in database
        User postUser = userService.saveUser(user);

        //TODO - fix check
        if (postUser == null){
            return ResponseEntity.ok()
                    .body("Account Already Exists With This Email or Username");
        } else {
            return ResponseEntity.ok()
                    .body("Successful Signup!");
        }
    }

    @PostMapping("/api/login")
    public ResponseEntity loginUser(@RequestBody User user, HttpServletResponse response) throws NoSuchAlgorithmException {
        // hash the password=
        user.setPassword(userService.hashPassword(user.getPassword()));

        String token;
        if ((token = userService.loginUser(user)) != null) {
            return ResponseEntity.ok()
                    .header("token", Long.toString(userService.findUser(token).getId()))
                    .header("Access-Control-Expose-Headers", "token")
                    .body("Successful Login");
        } else {
            return ResponseEntity.ok()
                    .body("Failed Login");
        }
    }

    @GetMapping("/api/userinfo")
    public User getUsername(@RequestHeader(name="token")Long token) {
        return userService.secureUser(userService.getUserWithId(token));
    }

    @GetMapping("/api/details/{id}")
    public ResponseEntity getUserNameWithId(@PathVariable long id){
        return ResponseEntity.ok()
                .body(userService.getUserNameWithId(id));
                //.body(userService.getUserWithId(id));
    }

    @GetMapping("/api/dashboard/{id}")
    public ResponseEntity getDashboardContents(@PathVariable long id){
        User user = userService.getUserWithId(id);
        DashboardData dashboardData = new DashboardData();
        /*
        if ((user = userService.loginUser(user)) == null){
            return ResponseEntity.ok()
                .body("User is not logged in");
        }
         */
        //TODO - these are temporary
        dashboardData.setRatings(new LinkedList<Rating>());
        dashboardData.setSubscriptions(new LinkedList<Long>());
        dashboardData.setFoodTrucks(foodTruckService.getOwnerFoodTrucks(user));

        return ResponseEntity.ok()
                .body(dashboardData);
    }

    @PostMapping("/api/dashboard/modify")
    public ResponseEntity modifyUser(@RequestBody Event event){
        User postUser;
        if ((postUser = userService.modifyUser(event)) != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postUser);
        } else {
            return ResponseEntity.ok()
                    .body("User modification failed");
        }
    }

    //TODO - double check this works especially with how I haven't tested sessions
    @PostMapping("/api/dashboard/preferences")
    public ResponseEntity modifyUserPreferences(@RequestBody Preferences preferences, @RequestHeader Long userId){
        User postUser;
        if ((postUser = userService.modifyUserPreferences(preferences, userId)) != null) {
            return ResponseEntity.ok()
                    .body(userService.secureUser(postUser));
        } else {
            return ResponseEntity.ok()
                    .body("User preference modification failed");
        }
    }

    @GetMapping("/api/subscribe/{truckId}")
    public ResponseEntity subscribeUserToTruck(@PathVariable Long truckId, @RequestHeader Long userId){
        User postUser;
        if ((postUser = userService.addSubscription(truckId, userId)) != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postUser);
        } else {
            return ResponseEntity.ok()
                    .body("User subscription failed");
        }
    }

    //dash/board/addTruck is in FoodTruckController

}

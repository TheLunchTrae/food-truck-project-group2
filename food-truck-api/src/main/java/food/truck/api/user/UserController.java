package food.truck.api.user;

import food.truck.api.foodtruck.FoodTruck;
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
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

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
    }

    //TODO - seriously change this
    @GetMapping("/api/dashboard/{id}")
    public ResponseEntity getDashboardContents(@PathVariable long id){
        User user = userService.getUserWithId(id);
        DashboardData dashboardData = new DashboardData();
        if (user != null){
            dashboardData.setRatings(user.getUserRatings());
            dashboardData.setSubscriptions(user.getSubscriptions());
            dashboardData.setFoodTrucks(foodTruckService.getOwnerFoodTrucks(user));

        } else {
            dashboardData.setRatings(new LinkedList<Rating>());
            dashboardData.setSubscriptions(new LinkedList<Long>());
            dashboardData.setFoodTrucks(new LinkedList<FoodTruck>());
        }
        return ResponseEntity.ok()
                .body(dashboardData);
    }

    //Note Location is not one of the preferences returned (it'll be left blank)
    @GetMapping("/api/getPreferences")
    public ResponseEntity getUserPreferences(@RequestHeader Long token){
        User user = userService.getUserWithId(token);
        Preferences preferences;
        if ((preferences = userService.getUserPreferences(token)) != null) {
            return ResponseEntity.ok().body(preferences);
        } else {
            //TODO - should this really be here???
            return ResponseEntity.ok().body(new Preferences());
        }
    }

    //TODO - REMOVE; FUNDAMENTALLY BROKEN
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

    //TODO - DEPRECATED; REMOVE SOON
    //TODO - double check this works especially with how I haven't tested sessions
    @PostMapping("/api/dashboard/preferences")
    public ResponseEntity modifyUserPreferences(@RequestBody Preferences preferences, @RequestHeader Long token){
        User postUser;
        if ((postUser = userService.modifyUserPreferences(preferences, token)) != null) {
            return ResponseEntity.ok()
                    .body(userService.secureUser(postUser));
        } else {
            return ResponseEntity.ok()
                    .body("User preference modification failed");
        }
    }

    /*************************USER MODIFICATION FUNCTIONS*****************************/

    @PostMapping("/api/modify/username")
    public ResponseEntity modifyUsername(@RequestBody String newUsername, @RequestHeader Long userId){return null;}
    @PostMapping("/api/modify/password")
    public ResponseEntity modifyPassword(@RequestBody String newPassword, @RequestHeader Long userId){return null;}

    /*********************************************************************************/

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

    @GetMapping("/api/user/subscriptions")
    public List<FoodTruck> getUserSubscriptions(@RequestHeader(name="token") long token) {
        User user;
        user = userService.secureUser(userService.getUserWithId(token));

        // the return list
        List<FoodTruck> foodTruckList = new ArrayList<FoodTruck>();

        // get the truck ids that the user is subscribed to
        if(user.getSubscriptions() != null){
            for (long id : user.getSubscriptions()) {
                foodTruckList.add(foodTruckService.getFoodTruckWithId(id));
            }
        }

        // return
        if (foodTruckList.size() != 0) {
            return foodTruckList;
        }
        else {
            return null;
        }
    }

    @GetMapping("api/owner/trucks")
    public List<FoodTruck> getOwnersTrucks(@RequestHeader(name="token") long token) {
        User user;
        user = userService.getUserWithId(token);

        // make sure the user is an owner
        if (user.getUserType().equals("Owner")) {
            return foodTruckService.getOwnerFoodTrucks(user);
        }

        return null;
    }
}

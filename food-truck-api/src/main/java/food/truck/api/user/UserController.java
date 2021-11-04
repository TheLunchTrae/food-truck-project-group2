package food.truck.api.user;

import food.truck.api.foodtruck.FoodTruck;
import food.truck.api.foodtruck.FoodTruckService;
import food.truck.api.other.DashboardData;
import food.truck.api.other.Event;
import food.truck.api.rating.Rating;
import food.truck.api.subscription.Subscription;
import net.bytebuddy.dynamic.scaffold.MethodGraph;
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

import javax.servlet.http.HttpServletRequest;

@Log4j2
@RestController
public class UserController {
    private UserService userService;
    private FoodTruckService foodTruckService;

    @Autowired
    public UserController(UserService userService, FoodTruckService foodTruckService){
        this.userService = userService;
        this.foodTruckService = foodTruckService;
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
            Long uID = postUser.getId();
            request.getSession().setAttribute("ID", uID);
            return ResponseEntity.ok()
                    .header("User-Type", postUser.getUserType())
                    .body(postUser);
        } else {
            return ResponseEntity.ok()
                    .body(null);
        }
    }

    //TODO - change later - fine for now
    @GetMapping("/details/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity getUserNameWithId(@PathVariable long id){
        return ResponseEntity.ok()
                .body(userService.getUserNameWithId(id));
    }

    //URGENT TODO - figure out what exactly the backend should return
    @GetMapping("/dashboard/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
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
        dashboardData.setSubscriptions(new LinkedList<Subscription>());
        dashboardData.setFoodTrucks(foodTruckService.getOwnerFoodTrucks(user));

        return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .header("Content-Type", "application/json")
                .body(dashboardData);
    }

    //URGENT TODO - figure out what exactly the backend should return
    @PostMapping("/dashboard/modify")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity modifyUser(@RequestBody Event event){
        User postUser;
        if ((postUser = userService.modifyUser(event)) != null) {
            return ResponseEntity.ok()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .header("Content-Type", "application/json")
                    .body(postUser);
        } else {
            return ResponseEntity.ok()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .body("User modification failed");
        }
    }

    //dash/board/addTruck is in FoodTruckController

}

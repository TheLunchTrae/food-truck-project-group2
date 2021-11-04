package food.truck.api.foodtruck;

import lombok.extern.log4j.Log4j2;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class FoodTruckController {
    private FoodTruckService foodTruckService;

    @Autowired
    public FoodTruckController(FoodTruckService foodTruckService){
        this.foodTruckService = foodTruckService;
    }

    @PostMapping("/addTruck")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity addFoodTruck(@RequestBody FoodTruck foodTruck){
        FoodTruck postFoodTruck;
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if ((postFoodTruck = foodTruckService.addFoodTruck(foodTruck)) != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Food truck creation failed");
        }
    }

    @PostMapping("/modifyTruck")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity modifyFoodTruck(@RequestBody FoodTruck foodTruckDiff){
        FoodTruck postFoodTruck;
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if ((postFoodTruck = foodTruckService.modifyFoodTruck(foodTruckDiff)) != null){
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(postFoodTruck);
        } else {
            return ResponseEntity.ok()
                    .body("Food truck modification failed");
        }
    }


}

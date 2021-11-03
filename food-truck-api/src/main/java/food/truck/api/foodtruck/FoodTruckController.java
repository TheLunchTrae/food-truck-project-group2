package food.truck.api.foodtruck;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
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

    //URGENT TODO - figure out what exactly the backend should return
    @PostMapping("/dashboard/addTruck")
    public String addFoodTruck(@RequestBody FoodTruck foodTruck){
        //NOTE - MUST HAVE OWNER ID SET ON THE FRONT END!!!!!!
        if (foodTruckService.addFoodTruck(foodTruck) != null){
            return "Food truck created";
        } else {
            return "Food truck creation failed";
        }
    }
}

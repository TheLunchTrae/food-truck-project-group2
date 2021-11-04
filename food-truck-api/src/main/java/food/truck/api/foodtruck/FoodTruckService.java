package food.truck.api.foodtruck;

import food.truck.api.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FoodTruckService {
    private FoodTruckRepository truckRepository;

    //TODO - this an OK idea?
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public FoodTruckService(FoodTruckRepository truckRepository){
        this.truckRepository = truckRepository;
    }

    public FoodTruck addFoodTruck(FoodTruck foodTruck){
        //Get name of user who owns truck
        /*
        User user = userRepository.findByEmailAddress(ftc.getUsername());
        FoodTruck foodTruck = ftc.getFoodTruck();
        //Set truck's owner id
        foodTruck.setOwnerId(user.getId());
        */
        return truckRepository.save(foodTruck);
    }

    public FoodTruck modifyFoodTruck(FoodTruck foodTruckDiff){
        FoodTruck foodTruck = truckRepository.findByTruckId(foodTruckDiff.getTruckId());
        if (foodTruck == null){
            return null;
        }

        //Change based on whether there was any input
        if (foodTruckDiff.getRoute().length() > 0){
            foodTruck.setRoute(foodTruckDiff.getRoute());
        }
        if (foodTruckDiff.getSchedule().length() > 0){
            foodTruck.setSchedule(foodTruckDiff.getSchedule());
        }
        if (foodTruckDiff.getMenu().length() > 0){
            foodTruck.setMenu(foodTruckDiff.getMenu());
        }
        if (foodTruckDiff.getDescription().length() > 0){
            foodTruck.setDescription(foodTruckDiff.getDescription());
        }

        return truckRepository.save(foodTruck);
    }

    public Optional<FoodTruck> findUser(Long userId) {
            return truckRepository.findById(userId);
        }

}

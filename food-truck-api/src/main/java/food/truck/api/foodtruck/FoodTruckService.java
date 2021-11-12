package food.truck.api.foodtruck;

import food.truck.api.other.FoodItem;
import food.truck.api.user.User;
import food.truck.api.user.UserRepository;
import food.truck.api.other.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
        System.out.println(foodTruck);
        return truckRepository.save(foodTruck);
    }

    //TODO - add custom way to add routes & food items
    public FoodTruck modifyFoodTruck(FoodTruck foodTruckDiff){
        FoodTruck foodTruck = truckRepository.findByTruckId(foodTruckDiff.getTruckId());
        if (foodTruck == null){
            return null;
        }
        //Change based on whether there was any input
        /*
        if (foodTruckDiff.getRoute().length() > 0){
            foodTruck.setRoute(foodTruckDiff.getRoute());
        }
        */
        foodTruck.addRouteLocation("TEST_LOCATION");
        if (foodTruckDiff.getSchedule().length() > 0){
            foodTruck.setSchedule(foodTruckDiff.getSchedule());
        }
        /*
        if (foodTruckDiff.getMenu().length() > 0){
            foodTruck.setMenu(foodTruckDiff.getMenu());
        }
        */
        foodTruck.addFoodItem(new FoodItem("TEST_FOOD_TYPE","TEST_FOOD_NAME", (float) 7.99));
        if (foodTruckDiff.getDescription().length() > 0){
            foodTruck.setDescription(foodTruckDiff.getDescription());
        }

        return truckRepository.save(foodTruck);
    }

    public FoodTruck modifyFoodTruckMenuAddFoodItem(FoodTruck foodTruck, FoodItem foodItem){
        if (foodItem == null){
            return null;
        }
        foodTruck.addFoodItem(foodItem);
        return truckRepository.save(foodTruck);
    }

    public FoodTruck modifyFoodTruckAddRouteLocation(FoodTruck foodTruck, String location){
        if (location == null){
            return null;
        }
        foodTruck.addRouteLocation(location);
        return truckRepository.save(foodTruck);
    }

    public FoodTruck addRatingToFoodTruck(FoodTruck foodTruck, Integer rating){
        if (rating == null){
            return null;
        }
        foodTruck.addRating(rating);
        return truckRepository.save(foodTruck);
    }

    //NOTE - again id is needed
    public List<FoodTruck> getOwnerFoodTrucks(User user){
        Long ownerId = user.getId();
        return truckRepository.findAllByOwnerId(ownerId);
    }

    //TODO - add algorithm code here (i.e. replace "find all" trucks)
    //Base algo on - food type, location, rating, & price preferences
    public List<FoodTruck> getRecommendedTrucks(User user){
        // list of all the food trucks with their recommended score
        List<Pair<FoodTruck, Float>> recList = new ArrayList<Pair<FoodTruck, Float>>();

        // add each food truck and initialize the score to 0
        for (FoodTruck ft : truckRepository.findAll()) {
            recList.add(new Pair<FoodTruck, Float>(ft, 0.0f));
        }

        // calculate the score for each truck
        for (int i = 0; i < recList.size(); ++i) {
            // for each food type in the truck check if it matches a user preference
            for (FoodItem fi : recList.get(i).getL().getMenu()) {
                for (String pref : user.getFoodTypePreferences()) {
                    if (pref == fi)
                        recList.get(i).setR(recList.get(i).getR() + 1.0f);
                }
            }

            // add score based on price
            float priceScore = Math.abs(recList.get(i).getL().averagePrice() - user.getPricePreference());
            if (1f / priceScore == Float.POSITIVE_INFINITY) {
                priceScore = 1f;
            }
            else {
                priceScore = 1f / priceScore;
            }
            recList.get(i).setR(recList.get(i).getR() + priceScore);
        }

        // convert to list
        List<FoodTruck> resList = new ArrayList<FoodTruck>();
        for (int i = 0; i < recList.size(); ++i) {
            resList.add(recList.get(i).getL());
        }

        return resList;
    }

    public FoodTruck getFoodTruckWithId(long id){
        return truckRepository.findByTruckId(id);
    }

    public String getFoodTruckNameWithId(long id){
        return truckRepository.findByTruckId(id).getTruckName();
    }

    public Optional<FoodTruck> findUser(Long userId) {
            return truckRepository.findById(userId);
        }

}

package food.truck.api.foodtruck;

import food.truck.api.user.Rating;
import food.truck.api.user.User;
import food.truck.api.user.UserRepository;
import food.truck.api.other.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        if (foodTruckDiff.getTruckName().length() > 0){
            foodTruck.setTruckName((foodTruckDiff.getTruckName()));
        }
        if (foodTruckDiff.getSchedule().length() > 0){
            foodTruck.setSchedule(foodTruckDiff.getSchedule());
        }
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

    public FoodTruck modifyFoodTruckAddRouteLocation(FoodTruck foodTruck, Location location){
        if (location == null){
            return null;
        }
        foodTruck.addRouteLocation(location);
        return truckRepository.save(foodTruck);
    }

    public FoodTruck addRatingToFoodTruck(FoodTruck foodTruck, Rating rating){
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
                if (user.getFoodTypePreferences() != null) {
                    for (String pref : user.getFoodTypePreferences()) {
                        if (pref == fi.getFoodType())
                            recList.get(i).setR(recList.get(i).getR() + 1.0f);
                    }
                }
            }

            // add score based on price
            if (user.getPricePreference() != null) {
                float priceScore = Math.abs(recList.get(i).getL().averagePrice() - user.getPricePreference());
                if (1f / priceScore == Float.POSITIVE_INFINITY) {
                    priceScore = 1f;
                } else {
                    priceScore = 1f / priceScore;
                }
                recList.get(i).setR(recList.get(i).getR() + priceScore);
            }

            // add score based on rating
            if (user.getRatingPreference() != null) {
                float ratingScore = Math.abs(recList.get(i).getL().averageRating() - user.getRatingPreference());
                if (1f / ratingScore == Float.POSITIVE_INFINITY) {
                    ratingScore = 1f;
                } else {
                    ratingScore = 1f / ratingScore;
                }
                recList.get(i).setR(recList.get(i).getR() + ratingScore);
            }
        }

        // sort by score
        Collections.sort(recList, new Comparator<Pair<FoodTruck, Float>>() {
            @Override
            public int compare(Pair<FoodTruck, Float> o1, Pair<FoodTruck, Float> o2) {
                return o1.getR() < o2.getR() ? 1 : o1.getR() > o2.getR() ? -1 : 0;
            }
        });

        // convert to list
        List<FoodTruck> resList = new ArrayList<FoodTruck>();
        for (int i = 0; i < recList.size(); ++i) {
            resList.add(recList.get(i).getL());
        }

        return resList;
    }

    //Returns list of food trucks fitting search query
    public List<FoodTruck> getTruckSearchResults(String searchText){
    //Separate the string by space into separate lowercase strings for looser searching
        String[] searchStrings = searchText.toLowerCase().split(" ");
        List<FoodTruck> resList = new ArrayList<FoodTruck>();
        boolean mayAdd;
        //Iterate over all trucks
        for (FoodTruck ft : truckRepository.findAll()){
            mayAdd = true;
            String truckNameLowerCase = ft.getTruckName().toLowerCase();
            //Truck name must contain all strings
            for (String string : searchStrings){
                if (!truckNameLowerCase.contains(string)){
                    mayAdd = false;
                }
            }
            if (mayAdd)
                resList.add(ft);
        }

        return resList;
    }

    //TODO - IMPLEMENT
    public List<FoodTruck> getNearestTrucks(Location userLocation, int preferredDistance){
        System.out.println("Preferred distance: "+preferredDistance);
        List<FoodTruck> nearestTrucks = new LinkedList<>();
        //Iterate over all food trucks
        for (FoodTruck ft : truckRepository.findAll()){
            System.out.println("Current truck: "+ft.getTruckName());
            //Iterate over all locations in truck's route
            for (Location truckLocation : ft.getRoute()){
                System.out.println("\tCurrent location: "+truckLocation);
                double distanceBetween = haversineDistance(userLocation,truckLocation);
                System.out.println("Calculated distance to "+userLocation+": "+distanceBetween);
                if (distanceBetween <= preferredDistance){
                    nearestTrucks.add(ft);
                }
            }
        }

        return nearestTrucks;
    }

    //Derived from https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
    //private double haversineDistance(double lat1, double lon1, double lat2, double lon2){
    private double haversineDistance(Location loc1, Location loc2){
        //Calculate distance between latitudes and longitudes
        double dLat = Math.toRadians(loc2.getLatitude() - loc1.getLatitude());
        double dLon = Math.toRadians(loc2.getLongitude() - loc1.getLongitude());

        //Convert to radians
        double lat1 = Math.toRadians(loc1.getLatitude());
        double lat2 = Math.toRadians(loc2.getLatitude());

        //Apply haversine formulas
        double a = Math.pow(Math.sin(dLat / 2), 2) +
                Math.pow(Math.sin(dLon / 2), 2) *
                        Math.cos(lat1) *
                        Math.cos(lat2);
        double rad = 6371;
        double c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
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

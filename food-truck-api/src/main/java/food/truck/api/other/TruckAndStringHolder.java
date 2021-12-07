package food.truck.api.other;

import food.truck.api.foodtruck.FoodTruck;

public class TruckAndStringHolder {
    FoodTruck foodTruck;
    String string;

    public FoodTruck getFoodTruck() {
        return foodTruck;
    }

    public void setFoodTruck(FoodTruck foodTruck) {
        this.foodTruck = foodTruck;
    }

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
    }
}

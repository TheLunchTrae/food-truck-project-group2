package food.truck.api.foodtruck;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

@Data
@Embeddable
public class FoodItem {
    private String foodType;
    private String foodItemName;
    private Float foodItemPrice;
    public FoodItem() {}
    public FoodItem(String foodType, String foodItemName, float foodItemPrice){
        this.foodType = foodType;
        this.foodItemName = foodItemName;
        this.foodItemPrice = foodItemPrice;
    }

    public String toString(){
        return foodItemName + ", " + foodItemPrice;
    }
}

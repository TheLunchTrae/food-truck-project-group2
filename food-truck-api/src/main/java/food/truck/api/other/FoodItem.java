package food.truck.api.other;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;

@Embeddable
public class FoodItem {
    private String foodItemName;
    private Float foodItemPrice;
    public FoodItem(){}
    public FoodItem(String foodItemName, float foodItemPrice){
        this.foodItemName = foodItemName;
        this.foodItemPrice = foodItemPrice;
    }
    public String toString(){
        return foodItemName + ", " + foodItemPrice;
    }
}

package food.truck.api.user;

import java.io.*;
import java.util.Optional;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
@RestController
public class UserService {

    private UserRepository userRepository;

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody User user){
        return true;
    }

    @PostMapping("/signup")
    public boolean saveUser(@RequestBody User user) throws IOException {
        // open csv file
        FileWriter csvWriter = new FileWriter("./user.txt", true);
        Scanner csvScanner = new Scanner(new File("./user.txt"));

        // create a string to store the email from each line
        String databaseEmail;

        // the user email input
        String userEmail = user.getEmailAddress();

        // see if the email is in use
        while (csvScanner.hasNextLine()) {
            // get the line
            databaseEmail = csvScanner.nextLine();

            // get the email
            databaseEmail = databaseEmail.substring(0, databaseEmail.indexOf(','));

            // return false if the email is in use
            if (databaseEmail.equals(userEmail))
                return false;
        }

        // write the user
        csvWriter.append(user.toString() + "\n");

        // close the file
        csvScanner.close();
        csvWriter.flush();
        csvWriter.close();

        return true;
        //return userRepository.save(user);
    }

}

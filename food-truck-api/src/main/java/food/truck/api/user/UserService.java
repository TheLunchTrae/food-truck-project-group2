package food.truck.api.user;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    // Hashes the input string and returns the hash
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        // hash the password
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[]hashInBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));

        //bytes to hex
        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    @PostMapping("/login")
    public boolean loginUser(@RequestBody User user) throws FileNotFoundException, NoSuchAlgorithmException {
        // open csv file
        Scanner csvScanner = new Scanner(new File("./user.txt"));

        // strings for the email and password from the database
        String databaseEmail, databasePassword;

        // hash the password
        user.setPassword(hashPassword(user.getPassword()));

        // string for the input user email and password
        String userEmail = user.getEmailAddress(), userPassword = user.getPassword();

        // test each email and password
        while (csvScanner.hasNextLine()) {
            // get the line
            databaseEmail = csvScanner.nextLine();

            // get the password then email
            databasePassword = databaseEmail.substring(databaseEmail.indexOf(",") + 1, databaseEmail.lastIndexOf(","));
            databaseEmail = databaseEmail.substring(0, databaseEmail.indexOf(","));

            // test if the email is the same then password
            if (databaseEmail.equals(userEmail))
                if (databasePassword.equals(userPassword))
                    return true;
        }

        // close scanner
        csvScanner.close();

        return false;
    }

    @PostMapping("/signup")
    public boolean saveUser(@RequestBody User user) throws IOException, NoSuchAlgorithmException {
        // open csv file
        FileWriter csvWriter = new FileWriter("./user.txt", true);
        Scanner csvScanner = new Scanner(new File("./user.txt"));

        // create a string to store the email from each line
        String databaseEmail;

        // the user email input
        String userEmail = user.getEmailAddress();

        // hash the password
        user.setPassword(hashPassword(user.getPassword()));

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

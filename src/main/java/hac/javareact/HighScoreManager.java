package hac.javareact;//package hac.javareact;
//
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.ObjectOutputStream;
//
//public class HighScoreManager {
//
////    private void writeObject(ObjectOutputStream oos) throws IOException {
////        oos.defaultWriteObject();
////        // custom output
////        oos.writeObject(address.getHouseNumber());
////    }
////    private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
////        ois.defaultReadObject();
////        // read custom output
////        Integer houseNumber = (Integer) ois.readObject();
////        Address a = new Address();
////        a.setHouseNumber(houseNumber);
////        this.setAddress(a);
////    }
//
//    @Test
//    public void wrireToFile(int cScore,String uName) throws IOException, ClassNotFoundException {
//        Score score = new Score();
//        score.setScore(20);
//        score.setUserName("Joe");
//        FileOutputStream fileOutputStream = new FileOutputStream("Score.dat");
//        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
//        objectOutputStream.writeObject(score);
//        objectOutputStream.flush();
//        objectOutputStream.close();
//
//        FileInputStream fileInputStream = new FileInputStream("yourfile");
//        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
//        Person p2 = (Person) objectInputStream.readObject();
//        objectInputStream.close();
//
//        assertTrue(p2.getAge() == person.getAge());
//        assertTrue(p2.getName().equals(person.getName()));
//    }
//
//}
//

//import java.io.IOException;
//import java.io.ObjectInputStream;
//import java.io.ObjectOutputStream;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.util.Collections;
//import java.util.List;
//
//public  class HighScoreManager {
//
//    private static HighScoreManager instance;
//    private final Path scoresFilePath;
//    private List<Score> highScores;
//
//    private HighScoreManager(Path scoresFilePath) {
//        this.scoresFilePath = scoresFilePath;
//        loadHighScores();
//    }
//
//    public static synchronized HighScoreManager getInstance(Path scoresFilePath) {
//        if (instance == null) {
//            instance = new HighScoreManager(scoresFilePath);
//        }
//        return instance;
//    }
//
//    public synchronized void addScore(String username, int score)  {
//        Score newScore = new Score(username, score);
//        if (!highScores.contains(newScore)) {
//            highScores.add(newScore);
//            saveHighScores();
//        }
//
//    }
//
//    public synchronized List<Score> getHighScores() {
//        loadHighScores();
//        return highScores;
//    }
//
//    private void loadHighScores() {
//        try (ObjectInputStream ois = new ObjectInputStream(Files.newInputStream(scoresFilePath))) {
//            highScores = (List<Score>) ois.readObject();
//        } catch ( ClassNotFoundException | IOException e) {
//            // If the scores file does not exist, create an empty list
//            highScores = Collections.emptyList();
//        }
//    }
//
//    private void saveHighScores() {
//        try (ObjectOutputStream oos = new ObjectOutputStream(Files.newOutputStream(scoresFilePath))) {
//            oos.writeObject(highScores);
//        } catch (IOException e) {
//            System.err.println("Error saving high scores: " + e.getMessage());
//        }
//    }
//}


//package hac.javareact;

import java.io.*;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class HighScoreManager {

    private static final String SCORES_FILE = "scores.dat";
    private static HighScoreManager instance;
    private List<Score> highScores;
    private Path scoresFilePath;

    private HighScoreManager(Path scoresFilePath) {
        this.scoresFilePath = scoresFilePath;
        this.highScores = loadHighScores();
    }

    public static synchronized HighScoreManager getInstance(Path scoresFilePath) {
        if (instance == null) {
            instance = new HighScoreManager(scoresFilePath);
        }
        return instance;
    }

    public void addScore(String username, int score) throws HighScoreException {
        Score newScore = new Score(username, score);
        if (!highScores.contains(newScore)) {
            highScores.add(newScore);
            saveHighScores();
        } else {
            throw new HighScoreException("Duplicate username. Score not added.");
        }
    }

    public List<Score> getHighScores() {
        return highScores;
    }

    private List<Score> loadHighScores() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(scoresFilePath.toFile()))) {
            return (List<Score>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            // File does not exist or could not be read, return an empty list
            return new ArrayList<>();
        }
    }

    private void saveHighScores() throws HighScoreException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(scoresFilePath.toFile()))) {
            oos.writeObject(highScores);
        } catch (IOException e) {
            throw new HighScoreException("Error saving high scores.");
        }
    }
}


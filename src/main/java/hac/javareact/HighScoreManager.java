package hac.javareact;

import hac.javareact.HighScoreException;
import hac.javareact.Score;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The HighScoreManager class manages the high scores of a game.
 */
public class HighScoreManager {

    private static final String SCORES_FILE = "scores.dat";
    private static HighScoreManager instance;
    private List<Score> highScores;
    private Path scoresFilePath;

    /**
     * Private constructor to enforce singleton pattern.
     * Initializes the HighScoreManager with the path to the scores file.
     *
     * @param scoresFilePath The path to the scores file
     */
    private HighScoreManager(Path scoresFilePath) {
        this.scoresFilePath = scoresFilePath;
        this.highScores = loadHighScores();
    }

    /**
     * Returns the instance of the HighScoreManager using the provided scores file path.
     * If an instance already exists, returns the existing instance.
     * Implements lazy initialization.
     *
     * @param scoresFilePath The path to the scores file
     * @return The instance of the HighScoreManager
     */
    public static synchronized HighScoreManager getInstance(Path scoresFilePath) {
        if (instance == null) {
            instance = new HighScoreManager(scoresFilePath);
        }
        return instance;
    }

    /**
     * Adds a new score to the high scores list. If a record with the same username already exists,
     * only the score with the higher value will be retained in the list.
     *
     * @param username the username associated with the score
     * @param score    the score to be added
     * @return {@code true} if the score was added successfully, {@code false} otherwise
     * @throws HighScoreException if there is an error saving the high scores
     */
    public synchronized boolean addScore(String username, int score) throws HighScoreException {
        Score newScore = new Score(username, score);
        boolean updated = false;

        // Check if a record with the same username exists
        for (Score existingScore : highScores) {
            if (existingScore.getUsername().equals(username)) {
                // If the new score is higher, update the existing score and mark as updated
                if (newScore.getScore() < existingScore.getScore())
                    existingScore.setScore(newScore.getScore());
                updated = true;
                break;
            }
        }

        if (!updated) {
            // If no existing record was updated, add the new score
            highScores.add(newScore);
        }

        sortHighScores();
        trimHighScores();
        saveHighScores();
        return true;
    }

    /**
     * Sorts the high scores list in descending order based on the scores.
     */
    private void sortHighScores() {
        Collections.sort(highScores);
    }

    /**
     * Trims the high scores list to contain only the top 5 scores.
     * If the number of scores is greater than 5, removes the lowest scores.
     */
    private void trimHighScores() {
        if (highScores.size() > 5) {
            highScores.subList(5, highScores.size()).clear();
        }
    }

    /**
     * Retrieves the high scores list.
     *
     * @return The list of high scores
     */
    public List<Score> getHighScores() {
        return highScores;
    }

    /**
     * Loads the high scores from the scores file.
     * If the file does not exist or an error occurs while reading, returns an empty list.
     *
     * @return The list of high scores loaded from the scores file
     */
    private List<Score> loadHighScores() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(scoresFilePath.toFile()))) {
            return (List<Score>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            // File does not exist or could not be read, return an empty list
            return new ArrayList<>();
        }
    }

    /**
     * Saves the high scores to the scores file.
     *
     * @throws HighScoreException If there is an error saving the high scores to the file
     */
    private synchronized void saveHighScores() throws HighScoreException {
        try (ObjectOutputStream oos = new ObjectOutputStream(Files.newOutputStream(scoresFilePath))) {
            oos.writeObject(highScores);
        } catch (IOException e) {
            throw new HighScoreException("Error saving high scores.");
        }
    }
}

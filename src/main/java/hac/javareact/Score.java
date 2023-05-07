package hac.javareact;//package hac.javareact;

import java.io.Serializable;
import java.util.Objects;

//
//import java.io.Serializable;
//
//public class Score implements Serializable
//{
//    private static final long serialVersionUID = 1L;
//
//    public Score(){};
//    private int score;
//    private String userName;
//
//    int getScore()
//    {
//        return score;
//    }
//    String getUserName()
//    {
//        return userName;
//    }
//
//    void setScore(int currScore)
//    {
//        score = currScore;
//    }
//    void setUserName(String uName)
//    {
//       userName = uName;
//    }
//
//
//}
// A simple data class to represent a score with a user name and number of guesses
// A simple data class to represent a score with a user name and number of guesses
public class Score implements Serializable, Comparable<Score> {
    private final String userName;
    private final int score;

    public Score(String userName, int score) {
        this.userName = userName;
        this.score = score;
    }

    public String getUserName() {
        return userName;
    }

    public int getScore() {
        return score;
    }

    @Override
    public int compareTo(Score other) {
        return Integer.compare(score, other.score);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Score other = (Score) obj;
        return Objects.equals(userName, other.userName) && score == other.score;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userName, score);
    }
}


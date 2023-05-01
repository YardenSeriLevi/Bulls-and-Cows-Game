package hac.javareact;

import java.io.Serializable;

public class Score implements Serializable
{
    private static final long serialVersionUID = 1L;

    public Score(){};
    private int score;
    private String userName;

    int getScore()
    {
        return score;
    }
    String getUserName()
    {
        return userName;
    }

    void setScore(int currScore)
    {
        score = currScore;
    }
    void setUserName(String uName)
    {
       userName = uName;
    }


}

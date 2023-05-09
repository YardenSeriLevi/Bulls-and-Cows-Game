package hac.javareact;

import com.google.gson.Gson;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ApiServlet", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    private static final String SCORES_FILE = "scores.dat";
    private HighScoreManager highScoreManager;

    @Override
    public void init() throws ServletException {
        Path scoresFilePath = Paths.get(getServletContext().getRealPath("."), SCORES_FILE);
        this.highScoreManager = HighScoreManager.getInstance(scoresFilePath);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("in get");
        response.setHeader("Access-Control-Allow-Origin", "*");

        List<Score> highScores = highScoreManager.getHighScores();
        if (highScores == null) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error retrieving high scores");
            return;
        }

        Collections.sort(highScores);
        List<Score> topHighScores = highScores.subList(0, Math.min(5, highScores.size()));

        System.out.println("List of high scores: size: "+topHighScores.size());

        for (Score score : topHighScores) {
            System.out.println("score="+score.getScore()+"u name"+score.getUsername());
        }

        // Convert topHighScores to JSON
        String json = convertHighScoresToJson(topHighScores);

        response.setContentType("application/json");
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("in post");
        String username = req.getParameter("username");
        int score = Integer.parseInt(req.getParameter("score"));
        System.out.println("in post score:" + score + "u name: " + username);


        try {
            highScoreManager.addScore(username, score);
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } catch (HighScoreException e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
        System.out.println("after");
    }

    @Override
    public void destroy() {
        // Perform any cleanup tasks if needed
    }

    private String convertHighScoresToJson(List<Score> highScores) {
        // Convert the highScores list to JSON format
        // You can use a JSON library like Gson or Jackson for this purpose
        // Here's an example using Gson:
         Gson gson = new Gson();
         return gson.toJson(highScores);
    }
}

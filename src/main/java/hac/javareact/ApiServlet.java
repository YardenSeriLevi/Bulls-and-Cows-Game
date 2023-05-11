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
    private  final String errorMassage = "HO HO looks like we can't connect to the server. Please try again.";
    private HighScoreManager highScoreManager;

    @Override
    public void init() throws ServletException {
        Path scoresFilePath = Paths.get(getServletContext().getRealPath("."), SCORES_FILE);
        this.highScoreManager = HighScoreManager.getInstance(scoresFilePath);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");

        List<Score> highScores = highScoreManager.getHighScores();
        if (highScores == null) {
            setErrorResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, errorMassage);
        }

        Collections.sort(highScores);
        List<Score> topHighScores = highScores.subList(0, Math.min(5, highScores.size()));

        // Convert topHighScores to JSON
        String json = convertHighScoresToJson(topHighScores);

        response.setContentType("application/json");
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String username = req.getParameter("username");
        int score = Integer.parseInt(req.getParameter("score"));

        try {
            highScoreManager.addScore(username, score);
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } catch (HighScoreException e) {
            setErrorResponse(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, errorMassage);
        }
    }

    private String convertHighScoresToJson(List<Score> highScores) {
         Gson gson = new Gson();
         return gson.toJson(highScores);
    }
    private void setErrorResponse(HttpServletResponse response, int statusCode, String errorMessage) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + errorMessage + "\"}");
    }
}

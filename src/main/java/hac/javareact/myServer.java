//
//import hac.javareact.HighScoreException;
//import hac.javareact.HighScoreManager;
//import hac.javareact.Score;
//
//import java.io.IOException;
//import java.io.ObjectOutputStream;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Collections;
//import java.util.List;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///* You can delete this comment before submission - it's only here to help you get started.
//Your servlet should be available at "/java_react_war/api/highscores"
//assuming you don't modify the application's context path (/java_react_war).
//on the client side, you can send request to the servlet using:
//fetch("/java_react_war/api/highscores")
//*/
//
//@WebServlet(name = "ServletApi", value = "/api/highscores")
//public class ApiServlet extends HttpServlet {
//    private static final String SCORES_FILE = "scores.dat";
//    private HighScoreManager highScoreManager;
//
//    public void HighScoreServlet() {
//        Path scoresFilePath = Paths.get(getServletContext().getRealPath("."), SCORES_FILE);
//        this.highScoreManager = HighScoreManager.getInstance(scoresFilePath);
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//        System.out.println("in do post");
//        String username = req.getParameter("username");
//        int score = Integer.parseInt(req.getParameter("score"));
//        highScoreManager.addScore(username, score);
//
//        resp.setStatus(HttpServletResponse.SC_CREATED);
//    }
//
//    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//        List<Score> highScores = highScoreManager.getHighScores();
//        if (highScores == null) {
//            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error retrieving high scores");
//            return;
//        }
//        Collections.sort(highScores);
//        List<Score> topHighScores = highScores.subList(0, Math.min(5, highScores.size()));
//        ObjectOutputStream oos = new ObjectOutputStream(resp.getOutputStream());
//        oos.writeObject(topHighScores);
//        oos.flush();
//        oos.close();
//    }
//
//}

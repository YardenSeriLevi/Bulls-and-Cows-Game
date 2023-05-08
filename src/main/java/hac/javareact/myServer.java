//package hac.javareact;
//import java.io.IOException;
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
//    /**
//     * @param request
//     * @param response
//     * @throws IOException
//     */
//    @Override
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        response.getWriter().println("You are not supposed to browse this page. It will be used for API calls.");
//
//    }
//
//
//    /**
//     * @param request
//     * @param response
//     * @throws IOException
//     */
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // your code here
//
//
//        System.out.println("req =" +request);
//        System.out.println("mhkbkb");
//        // note: this is necessary to allow cross-origin requests from the React frontend
//        response.setContentType("application/json");
//        // send JSON as the response
//        response.getWriter().write("text");
//
//    }
//
//
//    @Override
//    public void init() {
//    }
//
//    @Override
//    public void destroy() {
//    }
//}
//

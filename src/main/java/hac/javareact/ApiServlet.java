package hac.javareact;

import com.google.gson.Gson;

import java.io.*;
import java.util.Map;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/* You can delete this comment before submission - it's only here to help you get started.
Your servlet should be available at "/java_react_war/api/highscores"
assuming you don't modify the application's context path (/java_react_war).
on the client side, you can send request to the servlet using:
fetch("/java_react_war/api/highscores")
*/

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // your code here

        // note: this is necessary to allow cross-origin requests from the React frontend
         response.setHeader("Access-Control-Allow-Origin", "*");
         //
        response.setContentType("application/json");

        // Allowing React client side development on a different server:
        response.setHeader("Access-Control-Allow-Origin", "*");

        try {
            validateParameters(request.getParameterMap());

            int currScore = Integer.parseInt(request.getParameter(CURRENT_SCORE));
            String uName = Integer.parseInt(request.getParameter(USER_NAME));

           //write to file

            FileManager.instance.writeToFile()
            // If we got here with no exception, then everything is okay, and we can
            // fulfill the request.
            response.setStatus(HttpServletResponse.SC_OK);
            int result = leftOperand + rightOperand;

            // convert result to json and send it to the client
            Gson gson = new Gson();
            String json = gson.toJson(new Result(result));
            response.getWriter().write(json);

        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("operands must be integers");

        } catch (MissingOperandException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(e.getMessage());
        }
    }
        // remove this line ! it's only for you to browse the template
        response.getWriter().println("You are not supposed to browse this page. It will be used for API calls.");
    }

    /**
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // your code here

        // note: this is necessary to allow cross-origin requests from the React frontend
         response.setHeader("Access-Control-Allow-Origin", "*");

    }

    private void validateParameters(Map<String, String[]> parameterMap) throws MissingOperandException {
        if (!parameterMap.containsKey(PARAM_LEFT) || !parameterMap.containsKey(PARAM_RIGHT)) {
            throw new MissingOperandException(PARAM_LEFT, PARAM_RIGHT);
        }
    }

    @Override
    public void init() {
    }

    @Override
    public void destroy() {
    }
}

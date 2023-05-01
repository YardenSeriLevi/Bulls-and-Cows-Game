package hac.javareact;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class FileManager {

//    private void writeObject(ObjectOutputStream oos) throws IOException {
//        oos.defaultWriteObject();
//        // custom output
//        oos.writeObject(address.getHouseNumber());
//    }
//    private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
//        ois.defaultReadObject();
//        // read custom output
//        Integer houseNumber = (Integer) ois.readObject();
//        Address a = new Address();
//        a.setHouseNumber(houseNumber);
//        this.setAddress(a);
//    }

    @Test
    public void wrireToFile(int cScore,String uName) throws IOException, ClassNotFoundException {
        Score score = new Score();
        score.setScore(20);
        score.setUserName("Joe");
        FileOutputStream fileOutputStream = new FileOutputStream("Score.dat");
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(score);
        objectOutputStream.flush();
        objectOutputStream.close();

        FileInputStream fileInputStream = new FileInputStream("yourfile");
        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
        Person p2 = (Person) objectInputStream.readObject();
        objectInputStream.close();

        assertTrue(p2.getAge() == person.getAge());
        assertTrue(p2.getName().equals(person.getName()));
    }

}




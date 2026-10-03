import Header from "./Hearder";
import Sidebar from "./Sidebar";
import TotalDepense from "./TotalDepense";
import Form from "./Form";
import styles from "../styles/app.module.css";
import ListeDepense from "./ListeDepense";
import { useEffect, useState } from "react";

function App() {
  const [depenses, setDepenses] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const reponse = await fetch("/data");
      const data = await reponse.json();
      setDepenses(data.depenses);
      setUserEmail(data.user.email);
    })();
  }, []);
  return (
    <div className={styles.app}>
      <Header
        onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        email={userEmail}
      />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <TotalDepense
        totalDepense={depenses.reduce((acc, elt) => acc + +elt.montant, 0)}
      />
      <Form setDepense={setDepenses} />
      <ListeDepense depenses={depenses} />
    </div>
  );
}

export default App;

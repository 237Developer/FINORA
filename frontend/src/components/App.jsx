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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("cettesemaine");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const reponse = await fetch(`/data?frequency=${filter}`);
        const data = await reponse.json();
        setDepenses(data.depenses);
        setUserEmail(data.user.email);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filter]);

  return (
    <div className={styles.app}>
      <Header
        onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
        email={userEmail}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenForm={() => setIsFormOpen(true)}
        email={userEmail}
      />
      <TotalDepense
        totalDepense={depenses.reduce((acc, elt) => acc + +elt.montant, 0)}
        filter={filter}
        setFilter={setFilter}
        isLoading={isLoading}
      />
      <Form
        setDepense={setDepenses}
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        filter={filter}
      />
      <ListeDepense
        depenses={depenses}
        setDepenses={setDepenses}
        filter={filter}
        setFilter={setFilter}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;

export async function handleFormSubmit({
  e,
  filter,
  setIsSubmitting,
  setErrorMessage,
  setDepense,
  handleClose,
}) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const rawDate = formData.get("date");
  if (rawDate) {
    formData.set("date", new Date(rawDate).toISOString());
  }

  const dataFormEncoded = new URLSearchParams(formData);

  setIsSubmitting(true);
  setErrorMessage("");

  try {
    const reponse = await fetch(`/data?frequency=${filter || "cettesemaine"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dataFormEncoded,
    });

    if (!reponse.ok) {
      const errorData = await reponse.json().catch(() => null);
      const message = typeof errorData === "string" 
        ? errorData 
        : (errorData?.message || JSON.stringify(errorData) || "Erreur serveur");
      throw new Error(message);
    }

    const data = await reponse.json();
    setDepense(data.depenses || data);
    handleClose();
  } catch (err) {
    setErrorMessage(err.message);
  } finally {
    setIsSubmitting(false);
  }
}

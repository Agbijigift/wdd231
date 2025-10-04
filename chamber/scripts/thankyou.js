const params = new URLSearchParams(window.location.search);

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
};

setText("firstName", params.get("firstName"));
setText("lastName", params.get("lastName"));
setText("email", params.get("email"));
setText("mobile", params.get("mobile"));
setText("organization", params.get("organization"));
setText("timestampDisplay", params.get("tsmestamp"));
const elements = {
  form: document.querySelector("#form"),
  email: document.querySelector("#email"),
  country: document.querySelector("#country"),
  zip: document.querySelector("#zip"),
  password: document.querySelector("#password"),
  passwordConfirm: document.querySelector("#password-confirm"),
  submit: document.querySelector("#submit"),
};

elements.submit.addEventListener("click", (e) => {
  e.preventDefault();

  emailCheck();
  passwordCheck();
  passwordConfirmCheck();
  checkZip();

  const inputs = [
    elements.email,
    elements.country,
    elements.zip,
    elements.password,
    elements.passwordConfirm,
  ];
  let valid = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.checkValidity() == false) {
      valid = false;
    }
  }

  if (valid) {
    alert("Hi five!");
  } else {
    alert("Make sure all form inputs are correct.");
  }
});

const emailCheck = () => {
  const email = elements.email;

  if (email.value.length < 1) {
    email.setCustomValidity("Enter your email");
  } else {
    email.setCustomValidity("");
  }

  email.reportValidity();
};

const passwordCheck = () => {
  const pass = elements.password;

  if (pass.value.length < 8) {
    pass.setCustomValidity("Password must be at least 8 characters");
  } else {
    pass.setCustomValidity("");
  }

  pass.reportValidity();
};

elements.password.addEventListener("input", passwordCheck);

const passwordConfirmCheck = () => {
  if (elements.passwordConfirm.value.length < 8) {
    elements.passwordConfirm.setCustomValidity(
      "Password must be at least 8 characters"
    );
  } else if (elements.passwordConfirm.value !== elements.password.value) {
    elements.passwordConfirm.setCustomValidity("Passwords must match");
  } else {
    elements.passwordConfirm.setCustomValidity("");
  }
  elements.passwordConfirm.reportValidity();
};

elements.passwordConfirm.addEventListener("input", passwordConfirmCheck);

function checkZip() {
  const constraints = {
    IT: [
      "^(IT-)?\\d{4}$",
      "Italy ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    FR: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    DE: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    SP: [
      "^(SP-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Spanish ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
    UK: [
      "^([A-Z]{1,2}\\d{1,2}[A-Z]?)\\s?(\\d{1}\\w{2})$",
      "UK ZIPs must have a letter, followed by 1 or 2 digits, followed by a space or another digit followed by 2 more letters",
    ],
  };

  const countryValue = elements.country.value;
  const constraint = new RegExp(constraints[countryValue][0], "");

  if (constraint.test(elements.zip.value)) {
    elements.zip.setCustomValidity("");
  } else {
    elements.zip.setCustomValidity(constraints[countryValue][1]);
  }

  elements.zip.reportValidity();
}

window.onload = () => {
  elements.country.onchange = checkZip;
  elements.zip.oninput = checkZip;
};

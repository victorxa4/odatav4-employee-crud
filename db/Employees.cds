namespace app.Employees;

type Address {
  CEP : String(8);
  number : String(5);
  complement : String;
}

define entity Employee {
  key ID : UUID;
  name : String;
  jobTitle : String;
  address: Address;
  email: String;
}
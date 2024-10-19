const ExistingCustomer = function ({ customer, handleSelectCustomer }) {
  return (
    <p
      className="existingCustomer"
      onClick={() => handleSelectCustomer(customer)}
    >
      {customer.customer_name}
    </p>
  );
};

export default ExistingCustomer;

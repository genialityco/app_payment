import { Input, Typography, Select, Option } from "@material-tailwind/react";

export const PaymentForm = ({
  formData,
  handleChange,
  handleSelectChange,
  countries,
}) => {
  return (
    <article className='flex flex-col gap-4'>
      {/*   <Typography variant="h6" color="blue-gray" className="py-2.5">
        Primer nombre y apellidos
      </Typography> */}
      <Input
        variant="standard"
        placeholder="Primer nombre y apellidos"
        label="Primer nombre y apellidos"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        size="lg"
        className="focus:!border-t-gray-900 "
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      {/*   <Typography variant="h6" color="blue-gray" className="py-2.5">
        Numero de Identificación
      </Typography> */}
      <Input
        variant="standard"
        placeholder="Numero de identificación"
        label="Numero de identificación"
        type="number"
        name="document"
        value={formData.document}
        onChange={handleChange}
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      {/* <Typography variant="h6" color="blue-gray" className="py-2.5">
        Profesión
      </Typography> */}
      <Input
        variant="standard"
        placeholder="Profesión"
        label="Profesión"
        type="text"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
      />
      {/* <Typography variant="h6" color="blue-gray" className="py-2.5">
        Correo Electrónico
      </Typography> */}
      <Input
        variant="standard"
        label="Correo Electrónico"
        placeholder="name@mail.com"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className=" mb-5 !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div className="mt-5 flex flex-col gap-5">
        <Select
          name="country"
          value={formData.country || ""}
          // onChange={handleChange}
          onChange={(value) => handleSelectChange("country", value)}
          label="Selecciona un País"
          size="md"
        >
          {/* <option value=""></option> */}
          {countries.map((country) => (
            <Option key={country.countryCode} value={country.name}>
              {country.name}
            </Option>
          ))}
        </Select>

        <Select
          name="prefix"
          value={formData.prefix || ""}
          // onChange={handleChange}
          onChange={(value) => handleSelectChange("prefix", value)}
          label="Código País"
          size="md"
        >
          {/* <option value="">Código</option> */}
          {countries.map((country) => (
            <Option key={country.countryCode} value={country.prefix}>
              {country.prefix}
            </Option>
          ))}
        </Select>
      </div>
      {/* <Typography variant="h6" color="blue-gray" className="py-2.5">
        Numero de Identificación
      </Typography> */}
      <Input
      variant='standard'
        placeholder="Número de teléfono"
        label='Número de teléfono'
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </article>
  );
};

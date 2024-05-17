import { Input, Select, Option } from "@material-tailwind/react";

export const PaymentForm = ({
  formData,
  handleChange,
  handleSelectChange,
  countries,
}) => {
  return (
    <article className='flex flex-col gap-4'>
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
      {/* <Input
        variant="standard"
        placeholder="Profesión"
        label="Profesión"
        type="text"
        name="profession"
        value={formData.profession}
        onChange={handleChange}
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      /> */}
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
          onChange={(value) => handleSelectChange("country", value)}
          label="Selecciona un País"
          size="md"
        >
          {countries.map((country) => (
            <Option key={country.countryCode} value={country.name}>
              {country.name}
            </Option>
          ))}
        </Select>

        <Select
          name="prefix"
          value={formData.prefix || ""}
          onChange={(value) => handleSelectChange("prefix", value)}
          label="Código País"
          size="md"
        >
          {countries.map((country) => (
            <Option key={country.countryCode} value={country.prefix}>
              {country.prefix}
            </Option>
          ))}
        </Select>
      </div>
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

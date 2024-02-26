import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Input, Typography, Button } from '@material-tailwind/react';
import { HiMail, HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await login(email, password);
      if (userCredential) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center py-10">
      <Card className="m-5 w-80 p-6 flex flex-col items-center md:w-1/2 max-w-md text-center border-2 bg-card">
        <div className="my-5">
          <Typography
            variant="h3"
            className=" font-openSans font-bold text-secundaryText "
          >
            Bienvenido de nuevo
          </Typography>
          <Typography
            variant="paragraph"
            className="mt-3 font-openSans font-semibold"
          >
            Por favor ingresa a tu cuenta
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="w-full lg:p-6">
          <div className="mb-1 flex flex-col gap-6">
            <div class="hidden relative w-full min-w-[200px] h-10">
              <div class="absolute grid w-5 h-6 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                <HiMail className="h-5 w-6 me-3" />
              </div>
              <Input
                variant="standard"
                type="text"
                label="Remember"
                placeholder="Remember"
                name="remember"
                /*  defaultValue="true" */
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div class="relative w-full min-w-[200px] h-10">
              <div class="absolute grid w-5 h-6 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                <HiMail className="h-5 w-6 me-3" />
              </div>
              <Input
                variant="standard"
                type="email"
                autoComplete="email"
                label="Correo Electronico"
                placeholder="Correo Electrónico"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent !border-t-blue-gray-200 focus:!border-t-gray-900 "
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div class="relative w-full min-w-[200px] h-10">
              <div class="absolute grid w-5 h-6 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                <HiLockClosed className="h-5 w-6 me-3" />
              </div>

              <Input
                variant="standard"
                type="password"
                autoComplete="current-password"
                label="Contraseña"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="font-openSans font-semibold mt-8 bg-btnPrimary " fullWidth disabled={!email || !password}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Login;

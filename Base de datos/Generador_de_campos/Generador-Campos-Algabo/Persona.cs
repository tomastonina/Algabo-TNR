using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Generador_Campos_Algabo
{
    class Persona
    {
        public string nombre;
        public string apellido;
        public string usuario;
        public int id;
        public int contraseña;
        public Persona (string n, string a, int i)
        {
            nombre = n;
            apellido = a;
            id = i;

        }


    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace Generador_Campos_Algabo
{
    public partial class Form1 : Form
    {
        static List<Persona> personas = new List<Persona>();

        SqlConnection conexion_bd = new SqlConnection("server=DESKTOP-NFI8JMR\\SQLEXPRESS; database=algabo_TNR ; integrated security = true");
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {

            SqlDataAdapter adaptador = new SqlDataAdapter();
            DataTable tabla = new DataTable();
            SqlCommand comando = new SqlCommand("Select dni, nombre, apellido, usuario, contraseña from personal", conexion_bd);
            conexion_bd.Open();
            adaptador.SelectCommand = comando;
            dgvPersonas.DataSource = tabla;
            adaptador.Fill(tabla);
            adaptador.Dispose();
            SqlDataReader lector = comando.ExecuteReader();

            while (lector.Read())
            {
                string nombre_real = "";
                string nombre = (string)lector["nombre"];
                for (int i = 0; i < nombre.Length; i++)
                {
                    if (char.IsWhiteSpace(nombre[i]))
                    {
                        break;
                    }
                    else
                    {
                        nombre_real += nombre[i];
                    }                 
                }
                string apellido = (string)lector["apellido"];
                int id = (int)lector["dni"];
                personas.Add(new Persona(nombre_real, apellido, id));
            }

            conexion_bd.Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            conexion_bd.Open();
            SqlCommand comando = new SqlCommand("Select dni from personal", conexion_bd);
            SqlDataReader lector = comando.ExecuteReader();
            List<int> numeros = new List<int>();
            Random azar = new Random();

            while (lector.Read())
            {
                int id = (int)lector["dni"];
                numeros.Add(id);
            }
            lector.Close();
            foreach (int n in numeros)
            {          
                foreach (Persona p in personas)
                {
                    if (p.id == n)
                    {
                        p.usuario = p.nombre + "." + p.apellido;
                        p.contraseña = azar.Next(10000, 100000000);
                        string consulta = "UPDATE personal SET usuario = @usuario, contraseña = @contraseña where dni = @dni";
                        SqlCommand comando1 = new SqlCommand(consulta, conexion_bd);
                        comando1.Parameters.AddWithValue("@usuario", p.usuario);
                        comando1.Parameters.AddWithValue("@dni", n);
                        comando1.Parameters.AddWithValue("@contraseña", p.contraseña);
                        comando1.ExecuteNonQuery();
                    }
                }
            }
            conexion_bd.Close();
        }
    }
}

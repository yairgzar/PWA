import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Menu from '@/components/Menu.vue'
import DashboardView from '@/components/views/DashboardView.vue'
import SucursalView from '@/components/RecursosMateriales/SucursalView.vue' // Recursos Materiales
import DietasView from '@/components/NutricionAdmin/Dietas.vue'
import PreguntaNutricionalView from '@/components/views/NutricionAdmin/PreguntaNutricionalView.vue'
import ValoracionNutricionalView from '@/components/views/NutricionAdmin/ValoracionNutricionalView.vue'
import EjerciciosView from '@/components/views/EjerciciosView.vue'
import RutinasEjerciciosView from '@/components/views/RutinasEjerciciosView.vue'
import RutinasView from '@/components/views/RutinasView.vue'
import ProgramaSaludableView from '@/components/views/ProgramaSaludableView.vue'
import DetalleProgramaView from '@/components/views/DetalleProgramaView.vue'
import EquipamientoView from '@/components/RecursosMateriales/EquipamientoView.vue' // Recursos Materiales
import AdeudosView from '@/components/RecursosMateriales/AdeudosView.vue' // Recursos Materiales
import MembresiasView from '@/components/views/MembresiaMiembros/MembresiasView.vue'
import MiembrosView from '@/components/views/MembresiaMiembros/MiembrosView.vue'
import TransaccionesView from '@/components/views/MembresiaMiembros/TransaccionesView.vue'
import PersonasView from '@/components/views/PersonasView.vue'
import AreasView from '@/components/RH/Areas.vue'
import PuestosView from '@/components/RH/Puestos.vue'
import EmpleadosView from '@/components/RH/Empleados.vue'
import InstructoresView from '@/components/views/InstructoresView.vue'
import HorariosView from '@/components/RH/Horarios.vue' 
import InstalacionesView from '@/components/RecursosMateriales/InstalacionesView.vue' // Recursos Materiales
import MantenimientoView from '@/components/RecursosMateriales/MantenimientoView.vue' // Recursos Materiales


import ProductosAdmin from '@/components/VentasAdmin/ProductosAdmin.vue'
import PreguntasAdmin from '@/components/VentasAdmin/PreguntasAdmin.vue'
import PedidosAdmin from '@/components/VentasAdmin/PedidosAdmin.vue'
import EvaluacionServicioAdmin from '@/components/VentasAdmin/EvaluacionServicioAdmin.vue'
import PagosAdmin from '@/components/VentasAdmin/PagosAdmin.vue'
import PromocionesAdmin from '@/components/VentasAdmin/PromocionesAdmin.vue'
import Opiniones_clientes_Admin from '@/components/VentasAdmin/Opiniones_clientes_Admin.vue'

import Promociones_Cliente from '@/components/VentasClientes/Promociones_Cliente.vue'
import Productos_Cliente from '@/components/VentasClientes/Productos_Cliente.vue'
import Preguntas_Cliente from '@/components/VentasClientes/Preguntas_Cliente.vue'
import EvaluacionServicio_Cliente from '@/components/VentasClientes/EvaluacionServicio_Cliente.vue'
import Opiniones_clientes_Cliente from '@/components/VentasClientes/Opiniones_clientes_Cliente.vue'
import Pagos_Cliente from '@/components/VentasClientes/Pagos_Cliente.vue'
import Pedidos_Cliente from '@/components/VentasClientes/Pedidos_Cliente.vue'




import DIetasCliente from '@/components/NutricionCliente/DIetasCliente.vue'
import ValoracionNutricionalCliente from '@/components/NutricionCliente/ValoracionNutricionalCliente.vue'
import ServiciosClientesView from '@/components/RH/ServiciosClientes.vue'
import UserView from '@/components/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register
    },
    {
      path:'/User', name:'User', component: UserView
    },  
    {
      path: '/home',
      name: 'home',
      component: Menu,
        children:[
          {
            path:'/dashboard', name:'dashboard', component: DashboardView
          },
          {
            path:'/sucursal', name:'sucursal', component: SucursalView
          },
          {
            path:'/dietas', name:'dietas', component: DietasView
          },
          {
            path:'/preguntaNutricional', name:'preguntaNutricional', component: PreguntaNutricionalView
          },
          {
            path:'/valoracionNutricional', name:'valoracionNutricional', component: ValoracionNutricionalView
          },
          {
            path:'/dietasCliente', name:'dietasCliente', component: DIetasCliente
          },
          {
            path:'/valoracionNutricionalCliente', name:'valoracionNutricionalCliente', component: ValoracionNutricionalCliente
          },
          {
            path:'/ejercicios', name:'ejercicios', component: EjerciciosView
          },
          {
            path:'/rutinas', name:'rutinas', component: RutinasView
          },
          {
            path:'/programaSaludable', name:'programaSaludable', component: ProgramaSaludableView
          },
          {
            path:'/Intructores', name:'rutinasEjercicios', component: RutinasEjerciciosView
          },
          {
            path:'/detalleProgramas', name:'detalleProgramas', component: DetalleProgramaView
          },
          {
            path:'/equipamiento', name:'equipamiento', component: EquipamientoView
          },
          {
            path:'/adeudo', name:'prestamos', component: AdeudosView
          },
          {
            path:'/membresias', name:'membresias', component: MembresiasView
          },
          {
            path:'/miembros', name:'miembros', component: MiembrosView
          },
          {
            path:'/transacciones', name:'transacciones', component: TransaccionesView
          },
          {
            path:'/personas', name:'personas', component: PersonasView
          },
          {
            path:'/areas', name:'areas', component: AreasView
          },
          {
            path:'/puestos', name:'puestos', component: PuestosView
          },
          {
            path:'/empleados', name:'empleados', component: EmpleadosView
          },
          {
            path:'/instructores', name:'intructores', component: InstructoresView
          },
          {
            path:'/horarios', name:'horarios', component: HorariosView
          },
          {
            path:'/horarios/:horarioId',name:'editarHorario', component: HorariosView,
            props: true  // Esto permite pasar el horarioId como prop al componente
          },          
          {
            path:'/serviciosclientes', name:'serviciosclientes', component: ServiciosClientesView
          },
          {
            path:'/instalaciones', name:'instalaciones', component: InstalacionesView
          },
          {
            path:'/mantenimiento', name:'mantenimiento', component: MantenimientoView
          },
          {
            path:'/ProductosAdmin', name:'ProductosAdmin', component: ProductosAdmin
          },
          {
            path:'/Opiniones_clientes_Admin', name:'Opiniones_clientes_Admin', component: Opiniones_clientes_Admin
          },
          {
            path:'/PromocionesAdmin', name:'PromocionesAdmin', component: PromocionesAdmin
          },
          {
            path:'/PreguntasAdmin', name:'PreguntasAdmin', component: PreguntasAdmin
          },
          {
            path:'/PedidosAdmin', name:'PedidosAdmin', component: PedidosAdmin
          },
          {
            path:'/EvaluacionServicioAdmin', name:'EvaluacionServicioAdmin', component: EvaluacionServicioAdmin
          },
          {
            path:'/PagosAdmin', name:'PagosAdmin', component: PagosAdmin
          },         
          {
            path:'/Promociones_Cliente', name:'Promociones_Cliente', component: Promociones_Cliente
          },
          {
            path:'/Productos_Cliente', name:'Productos_Cliente', component: Productos_Cliente
          },
          {
            path:'/Preguntas_Cliente', name:'Preguntas_Cliente', component: Preguntas_Cliente
          },
          {
            path:'/EvaluacionServicio_Cliente', name:'EvaluacionServicio_Cliente', component: EvaluacionServicio_Cliente
          },
          {
            path:'/Opiniones_clientes_Cliente', name:'Opiniones_clientes_Cliente', component: Opiniones_clientes_Cliente
          },
          {
            path:'/Pagos_Cliente', name:'Pagos_Cliente', component: Pagos_Cliente
          },
          {
            path:'/Pedidos_Cliente', name:'Pedidos_Cliente', component: Pedidos_Cliente
          },
        ]
    },
  ]
})

export default router

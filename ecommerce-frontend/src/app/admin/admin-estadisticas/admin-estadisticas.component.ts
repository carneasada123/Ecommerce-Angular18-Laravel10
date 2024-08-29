import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css']
})
export class AdminEstadisticasComponent implements OnInit {
  estadisticas: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getEstadisticas().subscribe(data => {
      this.estadisticas = data;
    });
  }
}

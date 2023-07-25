import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { CompanyDto, GeneralService } from '../services/general.service';



@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit  {


  
    companies: CompanyDto[] = [];
  
    constructor(private generalService: GeneralService) {}
  
    ngOnInit(): void {
      this.loadCompanies();
    }
  
    loadCompanies() {
      this.generalService.getAllCompanies().subscribe(
        (companies) => {
          this.companies = companies;
        },
        (error) => {
          console.error('Error fetching companies:', error);
        }
      );
    }
  

  

  // // async ngOnInit(): Promise<void> {
  // //   try {
  // //     this.options = await this.generalService.getOptions().toPromise();
  // //   } catch (error) {
  // //     console.error('Error fetching dropdown options:', error);
  // //   }
  // // }
}

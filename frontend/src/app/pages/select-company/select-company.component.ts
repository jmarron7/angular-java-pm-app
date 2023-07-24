import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';



@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent  {

  options: string=""//CompanyDto[] = [];

  

  // // async ngOnInit(): Promise<void> {
  // //   try {
  // //     this.options = await this.generalService.getOptions().toPromise();
  // //   } catch (error) {
  // //     console.error('Error fetching dropdown options:', error);
  // //   }
  // // }
}

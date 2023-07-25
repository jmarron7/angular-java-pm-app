import { Component, OnInit } from '@angular/core';
import { CompanyDto, GeneralService } from '../../services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css'],
})
export class SelectCompanyComponent implements OnInit {
  // TODO = ensure fetch only returns companies the logged in user is part of
  companies: CompanyDto[] = [];

  constructor(
    private generalService: GeneralService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    // this.generalService.getAllCompanies().subscribe({
    //   next: (companies) => {
    //     console.log(companies);
    //     this.companies = companies;
    //   },
    //   error: (e) => console.log('Error fetching companies: ', e),
    // });
    // this.generalService.getCompany().subscribe({
    //   next: (company) => {
    //     console.log(company);
    //     localStorage.setItem('company', JSON.stringify(company));
    //   },
    //   error: (e) => console.error('Error fetching companies:', e),
    // });
  }
}

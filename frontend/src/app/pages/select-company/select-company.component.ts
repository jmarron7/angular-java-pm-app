import { Component, OnInit } from '@angular/core';
import { CompanyDto, GeneralService } from '../../services/general.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css'],
})
export class SelectCompanyComponent implements OnInit {
  // TODO = ensure fetch only returns companies the logged in user is part of
  companies: CompanyDto[] = [];
  selectedCompanyId: number = 0;

  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      console.log(user);
      console.log(user.companies);
      this.companies = user.companies;
    }
  }

  nextPage() {
    alert(this.selectedCompanyId);
    this.router.navigateByUrl('');
  }
}

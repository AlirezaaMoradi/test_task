// Imports
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './cities.entity';
import { District } from '../districts/districts.entity';

@Injectable()
export class CitiesService implements OnModuleInit {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,

    @InjectRepository(District)
    private readonly districtRepo: Repository<District>
  ) {}

  async onModuleInit() {
    // --- seed شهرها ---
    const cities = [
      'تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز',
      'کرج', 'ارومیه', 'اهواز', 'یزد', 'رشت'
    ];
    const cityMap = {};

    for (const name of cities) {
      let city = await this.cityRepo.findOne({ where: { name } });
      if (!city) {
        city = await this.cityRepo.save({ name });
      }
      cityMap[name] = city;
    }

    // --- seed مناطق تهران ---
    const tehranDistricts = [
      'نیاوران', 'زعفرانیه', 'ولنجک', 'الهیه',
      'تجریش', 'فرمانیه', 'قیطریه', 'سعادت‌آباد', 'شهرک غرب',
      'جردن', 'پاسداران', 'ظفر', 'قلهک', 'دارآباد',
      'نارمک', 'لویزان', 'تهرانپارس غربی', 'هفت‌حوض',
      'صادقیه', 'شهرک اکباتان', 'پونک', 'آریاشهر',
      'میدان ونک', 'یوسف‌آباد', 'امیرآباد', 'ولیعصر',
      'انقلاب', 'منیریه', 'شمیران نو', 'مولوی',
      'جنوب شرقی تهران', 'خزانه', 'یافت‌آباد',
      'کن', 'وردآورد', 'حصارک', 'جنت‌آباد جنوبی',
      'راه‌آهن', 'جوادیه', 'خزانه', 'امیریه',
      'امامزاده حسن', 'شوش', 'مولوی', 'حسن‌آباد',
      'پامنار', 'میدان قیام', 'بازار', 'سبزه‌میدان',
      'نبرد', 'آهنگ', 'دولت‌آباد', 'جوادیه',
      'حکیمیه', 'لویزان', 'تهرانپارس شرقی',
      'افسریه', 'خاوران', 'نعمت‌آباد', 'مجیدیه',
      'خزانه', 'خانی‌آباد', 'نواب', 'عباس‌آباد',
      'یافت‌آباد', 'شهرک ولیعصر', 'جوادیه',
      'جنوب غربی تهران', 'شادآباد', 'عبدل‌آباد',
      'خانی‌آباد نو', 'بهاران', 'علی‌آباد',
      'نازی‌آباد', 'شهرری', 'فلاح', 'باقرشهر',
      'شهرک ولیعصر', 'شهرک پرواز', 'وردآورد',
      'چیتگر', 'شهرک راه‌آهن', 'وردآورد', 'باغ فیض'
    ];

    for (const name of tehranDistricts) {
      const exists = await this.districtRepo.findOne({ where: { name } });
      if (!exists) {
        await this.districtRepo.save({
          name,
          city: cityMap['تهران']
        });
      }
    }

    console.log('Cities and Tehran districts seeded!');
  }

  findAll() {
    return this.cityRepo.find({ relations: ['districts'] });
  }

  findOne(id: string) {
    return this.cityRepo.findOne({ where: { id }, relations: ['districts'] });
  }
}

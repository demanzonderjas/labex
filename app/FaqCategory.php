<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FaqCategory extends Model
{
    public function faqItems() {
        return $this->hasMany(FaqItem::class);
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FaqItem extends Model
{
    protected $appends = ['category'];

    public function faqCategory() {
        return $this->belongsTo(FaqCategory::class);
    }

    public function getCategoryAttribute() {
        return $this->faqCategory->name;
    }
}

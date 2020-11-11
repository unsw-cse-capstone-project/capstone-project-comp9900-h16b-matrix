package com.matrix.filmfinder.message;

import java.util.List;

public class RateMessage {
    private List<Integer> ratesCountByStars;
    private Double avg;
    private Integer count;

    public RateMessage(List<Integer> ratesCountByStars, Double avg, Integer count) {
        this.ratesCountByStars = ratesCountByStars;
        this.avg = avg;
        this.count = count;
    }

    public List<Integer> getRatesCountByStars() {
        return ratesCountByStars;
    }

    public void setRatesCountByStars(List<Integer> ratesCountByStars) {
        this.ratesCountByStars = ratesCountByStars;
    }

    public Double getAvg() {
        return avg;
    }

    public void setAvg(Double avg) {
        this.avg = avg;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}

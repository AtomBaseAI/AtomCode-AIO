#include <bits/stdc++.h>
using namespace std;

long long rope_cost(std::vector<int> ropes) {
    long long total = 0;
    while ((int)ropes.size() > 1) {
        int i1 = 0;
        for (int i = 1; i < (int)ropes.size(); i++)
            if (ropes[i] < ropes[i1]) i1 = i;
        int a = ropes[i1];
        ropes.erase(ropes.begin() + i1);
        int i2 = 0;
        for (int i = 1; i < (int)ropes.size(); i++)
            if (ropes[i] < ropes[i2]) i2 = i;
        int b = ropes[i2];
        ropes.erase(ropes.begin() + i2);
        long long merged = (long long)a + b;
        total += merged;
        ropes.push_back((int)merged);
    }
    return total;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> ropes(n);
    for (int& x : ropes) cin >> x;
    cout << rope_cost(ropes) << "\n";
    return 0;
}
